package br.com.itneki.nekicard.config;

import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI(){
        return new OpenAPI()
                .info(new Info().title("NekiCard API Documentation")
                                .description("Official documentation of NekiCard API Aplication")
                                .version("1.0.0")
                                .contact(new Contact()
                                                .email("gabrieldamico22@gmail.com")
                                                .name("Gabriel Damico")
                                                .url("https://github.com/Arawns1")
                                        ))
                .schemaRequirement("jwt_auth", createSecurityScheme());
    }
    private SecurityScheme createSecurityScheme(){
        return new SecurityScheme().name("jwt_auth")
                                   .type(SecurityScheme.Type.HTTP)
                                   .scheme("bearer")
                                   .bearerFormat("JWT")
                                   .in(SecurityScheme.In.HEADER);
    }
}
