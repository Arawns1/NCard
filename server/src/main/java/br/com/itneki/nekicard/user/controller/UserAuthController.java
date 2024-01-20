package br.com.itneki.nekicard.user.controller;

import br.com.itneki.nekicard.security.AuthResponse;
import br.com.itneki.nekicard.security.SignInDTO;
import br.com.itneki.nekicard.security.SignUpDTO;
import br.com.itneki.nekicard.user.services.UserAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name="1. Autenticação", description = "Autenticação do Usuário")
@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class UserAuthController {

    private final UserAuthService userAuthService;
    @PostMapping("/signup")
    @Operation(summary = "Cadastro de novo usuário",
            description = "Essa função é responsável por cadastrar um novo usuário e retornar seu token"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = AuthResponse.class)
                    )
            })
    })
    @Transactional
    public ResponseEntity<Object> signUp(@RequestBody @Valid SignUpDTO signUpDTO){
        try{
            var token = userAuthService.save(signUpDTO);
            return ResponseEntity.ok().body(token);

        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
    @PostMapping("/signIn")
    @Operation(summary = "Logar com usuário existente",
            description = "Essa função é responsável retornar o token do usuário se cadastrado"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = AuthResponse.class)
                    )
            })
    })
    @Transactional
    public ResponseEntity<Object> signIn(@RequestBody @Valid SignInDTO signInDTO){
        try{
            var token = userAuthService.auth(signInDTO);
            return ResponseEntity.ok().body(token);

        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
