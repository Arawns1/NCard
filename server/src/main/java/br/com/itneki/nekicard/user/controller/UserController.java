package br.com.itneki.nekicard.user.controller;

import br.com.itneki.nekicard.user.domain.User;
import br.com.itneki.nekicard.user.dto.SignUpUserDTO;
import br.com.itneki.nekicard.user.dto.UserUpdateDTO;
import br.com.itneki.nekicard.user.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.UUID;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
@Tag(name="Usuário", description = "Informações do usuário")
public class UserController {

    private final UserService userService;
    @GetMapping
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
    public ResponseEntity<Page<User>> findAll(@PageableDefault(size = 10, sort = "name") Pageable pagination){
        var result = userService.findAll(pagination);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Encontra o usuário pelo ID",
            description = "Essa função é responsável por encontrar o usuário com base no Id"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = User.class)
                    )
            }),
    })
    public ResponseEntity<Object> findById(@PathVariable UUID id){
        try{
            return ResponseEntity.ok().body(userService.findById(id));
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

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
    public ResponseEntity<Object> update(@PathVariable UUID id, @RequestBody UserUpdateDTO user){
        try{
            return ResponseEntity.ok().body(userService.update(id,user));
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping
    @Operation(summary = "Cadastro de novo usuário",
            description = "Essa função é responsável por cadastrar um novo usuário"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = SignUpUserDTO.class)
                    )
            })
    })
    @Transactional
    public ResponseEntity<Object> save(@RequestBody @Valid SignUpUserDTO user, UriComponentsBuilder uriBuilder){
        try{
            var result = userService.save(user);

            var uri = uriBuilder.path("/user/{id}")
                                .buildAndExpand(result.id())
                                .toUri();

            return ResponseEntity.created(uri).body(result);

        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @Operation(summary = "Exclusão lógica do usuário",
            description = "Essa função é responsável realizar a exclusão lógica do usuário"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204")
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
