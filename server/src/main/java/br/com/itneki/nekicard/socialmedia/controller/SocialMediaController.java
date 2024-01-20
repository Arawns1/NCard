package br.com.itneki.nekicard.socialmedia.controller;

import br.com.itneki.nekicard.socialmedia.domain.SocialMediaNames;
import br.com.itneki.nekicard.socialmedia.service.SocialMediaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.Enumerated;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
@RequestMapping("/socialmedia")
@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "jwt_auth")
@Tag(name="2.Usuário")
public class SocialMediaController {

    private final SocialMediaService service;
    @Operation(summary = "Remover Rede Social do Usuário",
            description = "Essa função é responsável realizar excluir a rede social vinculada ao usuário"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204"),
            @ApiResponse(responseCode = "400"),
    })

    @DeleteMapping("/{userId}")
    @Transactional
    public ResponseEntity<Object> delete( @PathVariable("userId") UUID userId,
                                         @Parameter(description = "Social Media Name",
                                                    schema = @Schema(implementation = SocialMediaNames.class))
                                         @RequestParam("socialMediaName") SocialMediaNames socialMediaName ){
        try{
            service.deleteSocialMedia(userId, socialMediaName);
            return ResponseEntity.noContent().build();
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
