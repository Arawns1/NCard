package br.com.itneki.nekicard.card.controller;

import br.com.itneki.nekicard.card.domain.Card;
import br.com.itneki.nekicard.card.dto.SaveCardDTO;
import br.com.itneki.nekicard.card.services.CardService;
import br.com.itneki.nekicard.user.domain.User;
import br.com.itneki.nekicard.user.dto.UserDetailsDTO;
import io.swagger.v3.oas.annotations.Operation;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.UUID;

@RequestMapping("/card")
@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "jwt_auth")
@Tag(name="3.Cartão", description = "Informações e geração de cartões")
public class CardController {

    private final CardService cardService;

    @Operation(summary = "Encontra o cartão pelo ID",
            description = "Essa função é responsável por encontrar o cartão com base no Id"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = Card.class)
                    )
            }),
    })
    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable UUID id){
        try{
            return ResponseEntity.ok().body(cardService.findById(id));
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @SecurityRequirement(name = "jwt_auth")
    @Operation(summary = "Encontra o usuário pelo ID do cartão nfc",
            description = "Essa função é responsável por encontrar o usuário com base no nfc do seu carão"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = UserDetailsDTO.class)
                    )
            }),
    })
    @GetMapping("/nfc/{nfcId}")
    public ResponseEntity<Object> findByNfcId(@PathVariable("nfcId") String nfcId){
        try{
            return ResponseEntity.ok().body(cardService.findByNfcId(nfcId));
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Salva um novo cartão",
            description = "Essa função é responsável salvar um novo cartão e vinculá-lo ao usuário logado"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = Card.class)
                    )
            }),
    })
    @PostMapping
    @Transactional
    public ResponseEntity<Object> save(HttpServletRequest request,
                                       @RequestBody @Valid SaveCardDTO saveCardDTO,
                                       UriComponentsBuilder uriBuilder){

        var userId = request.getAttribute("user_id").toString();
        try{
            var result = cardService.save(saveCardDTO, UUID.fromString(userId));

            var uri = uriBuilder.path("/user/{id}")
                                .buildAndExpand(result.getId())
                                .toUri();

            return ResponseEntity.created(uri).body(result);
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Apagar cartão",
            description = "Essa função é responsável por realizar a deleção lógica do cartão"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204"),
    })
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> delete(@PathVariable UUID id){
        try{
            cardService.delete(id);
            return ResponseEntity.noContent().build();
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
