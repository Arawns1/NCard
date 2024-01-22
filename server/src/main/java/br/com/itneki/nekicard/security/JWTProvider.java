package br.com.itneki.nekicard.security;

import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JWTProvider {

    private static String secretKey;

    @Value("${security.token.secret}")
    public void setSecretKey(String secretKey) {
        JWTProvider.secretKey = secretKey;
    }
    public static AuthResponse generateToken(String id, String role) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        var expires_at = Instant.now().plus(Duration.ofHours(6));
        String token = JWT.create()
                          .withIssuer("http://neki-card.com.br")
                          .withSubject(id)
                          .withClaim("role", List.of(role))
                          .withExpiresAt(expires_at)
                          .sign(algorithm);
        return new AuthResponse(token, expires_at.toEpochMilli());
    }

    public static DecodedJWT validateToken(String token) {
        token = token.replace("Bearer ", "");
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        try {
            return JWT.require(algorithm).build().verify(token);
        } catch (JWTVerificationException ex) {
            throw new JWTVerificationException("Invalid Token");
        }
    }
}
