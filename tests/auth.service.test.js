

const bcrypt = require("bcrypt");

const userRepository = require("../repositories/user.repository");

const authService = require("../services/auth.service");

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    test("should register a new user successfully", async () => {
      userRepository.findByEmail.mockResolvedValue(null);

      userRepository.createUser.mockImplementation(
        async (userData) => ({
          id: "user-1",
          ...userData
        })
      );

      const result = await authService.register({
        username: "Ahmed",
        email: "ahmed@example.com",
        password: "password123"
      });

      expect(result.username).toBe("Ahmed");

      expect(result.email).toBe("ahmed@example.com");

      expect(result).not.toHaveProperty("password");

      expect(userRepository.createUser).toHaveBeenCalled();

      const savedUser =
        userRepository.createUser.mock.calls[0][0];

      expect(savedUser.password).not.toBe("password123");

      expect(
        await bcrypt.compare(
          "password123",
          savedUser.password
        )
      ).toBe(true);
    });

    test("should reject an existing email", async () => {
      userRepository.findByEmail.mockResolvedValue({
        id: "user-1",
        email: "ahmed@example.com"
      });

      await expect(
        authService.register({
          username: "Ahmed",
          email: "ahmed@example.com",
          password: "password123"
        })
      ).rejects.toThrow("Email already exists");

      expect(userRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe("login", () => {
    test("should reject an unknown email", async () => {
      userRepository.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login(
          "unknown@example.com",
          "password123"
        )
      ).rejects.toThrow("Invalid email or password");
    });
  });
});
