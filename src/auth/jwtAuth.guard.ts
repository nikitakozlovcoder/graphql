import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest } from './authRequest';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {
    }

    private readonly scheme = 'bearer';

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest<AuthRequest>();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return false;
        }

        const [scheme, token] = authHeader.split(' ');
        if (scheme.toLowerCase() !== this.scheme) {
            return false;
        }

        const user = await this.authService.getUserFromJwt(token);
        request.user = user;
        return !!user;
    }
}
