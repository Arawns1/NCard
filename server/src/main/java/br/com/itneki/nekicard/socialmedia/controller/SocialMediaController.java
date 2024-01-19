package br.com.itneki.nekicard.socialmedia.controller;

import br.com.itneki.nekicard.socialmedia.service.SocialMediaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;
@RequestMapping("/socialmedia")
@RestController
@RequiredArgsConstructor
@Tag(name="Usuário")
public class SocialMediaController {

    private final SocialMediaService service;
    @Operation(summary = "Remover Rede Social do Usuário",
            description = "Essa função é responsável realizar excluir a rede social vinculada ao usuário"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204"),
            @ApiResponse(responseCode = "400"),
    })
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> delete(@PathVariable("id") UUID id ){
        try{
            service.deleteSocialMedia(id);
            return ResponseEntity.noContent().build();
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
