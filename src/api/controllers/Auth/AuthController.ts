import { JsonController, Post, Body, Get, QueryParam, Res } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { AuthService } from "../../services/Auth/AuthService";
import Container from "typedi";
import { IAuthService } from "../../interfaces/Auth/IAuthService";
import { AuthResponse } from "../../models/Auth/AuthResponse";
import { AuthRequest } from "../../models/Auth/AuthRequest";
@JsonController("/auth")
export class AuthController {
  private authService: IAuthService;

  constructor() {
    this.authService = Container.get(AuthService);
  }

  @Post("/login")
  @OpenAPI({ summary: "Authenticate user" })
  login(@Body() user: AuthRequest): Promise<AuthResponse | undefined> {
    return this.authService.login(user);
  }

  @Get("/google-url")
  @OpenAPI({ summary: "Get google url" })
  getGoogleUrl(): Promise<string> {
    return this.authService.googleUrl();
  }

  @Get("/google-auth")
  @OpenAPI({ summary: "Get token from google auth" })
  authGoogle(@QueryParam("code") code: string): Promise<any> {
    return this.authService.googleAuth(code);
  }
}
