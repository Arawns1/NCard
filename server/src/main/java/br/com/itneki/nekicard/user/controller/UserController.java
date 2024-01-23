package br.com.itneki.nekicard.user.controller;

import br.com.itneki.nekicard.security.AuthResponse;
import br.com.itneki.nekicard.security.SignInDTO;
import br.com.itneki.nekicard.user.domain.User;
import br.com.itneki.nekicard.security.SignUpDTO;
import br.com.itneki.nekicard.user.dto.UpdateUserDTO;
import br.com.itneki.nekicard.user.dto.UserDetailsDTO;
import br.com.itneki.nekicard.user.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor

@Tag(name="2.Usuário", description = "Informações do usuário")
public class UserController {

    private final UserService userService;
    @GetMapping("/findAll")
    @SecurityRequirement(name = "jwt_auth")
    @Operation(summary = "Listagem de todos os usuários",
            description = "Essa função é responsável por listar todos os usuários"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = User.class)
                    )
            }),
            @ApiResponse(responseCode = "400", description = "Usuário já existe")
    })
    public ResponseEntity<Page<UserDetailsDTO>> findAll(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                              @RequestParam(name = "size", defaultValue = "10") Integer size,
                                              @RequestParam(name = "sort", defaultValue = "name") String sort,
                                              @Parameter(description = "Page Ordenation",schema = @Schema(implementation = Sort.Direction.class))
                                              @RequestParam(name = "direction", defaultValue = "ASC") Sort.Direction direction){
        var pagination = PageRequest.of(page, size, direction, sort);
        var result = userService.findAll(pagination);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping
    @SecurityRequirement(name = "jwt_auth")
    @Operation(summary = "Encontra o perfil do usuário logado",
            description = "Essa função é responsável por retonar as informações do perfil logado"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = UserDetailsDTO.class)
                    )
            }),
    })
    public ResponseEntity<Object> findById(HttpServletRequest request){
        var userId = request.getAttribute("user_id").toString();
        try{
            return ResponseEntity.ok().body(userService.findById(UUID.fromString(userId)));
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/{id}")
    @Operation(summary = "Encontra o usuário pelo ID",
            description = "Essa função é responsável por encontrar o usuário com base no Id"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = UserDetailsDTO.class)
                    )
            }),
    })
    public ResponseEntity<Object> findById(@PathVariable("id") UUID userId){
        try{
            return ResponseEntity.ok().body(userService.findById(userId));
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }





    @SecurityRequirement(name = "jwt_auth")
    @Operation(summary = "Atualiza o usuário com base no ID",
            description = "Essa função é responsável por atualizar informações do usuário com base no Id"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = User.class)
                    )
            }),
    })
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> update(@PathVariable UUID id, @RequestBody UpdateUserDTO user){
        try{
            return ResponseEntity.ok().body(userService.update(id,user));
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @SecurityRequirement(name = "jwt_auth")
    @Operation(summary = "Exclusão lógica do usuário",
            description = "Essa função é responsável realizar a exclusão lógica do usuário"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204"),
            @ApiResponse(responseCode = "400"),
    })
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> delete(@PathVariable UUID id){
        try{
            userService.delete(id);
            return ResponseEntity.noContent().build();
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
