const AUTH_TYPES = {
  AuthController: Symbol("AuthController"),
  AuthRouter: Symbol("AuthRouter"),
  AuthService: Symbol("AuthServiceAdapter"),
  CredentialService: Symbol("CredentialService"),
  HashService: Symbol("HashService"),
  CredentialRepository: Symbol("CredentialRepository"),
  PassportStrategyInstance: Symbol("PassportStrategyInstance"),
};

export default AUTH_TYPES;
