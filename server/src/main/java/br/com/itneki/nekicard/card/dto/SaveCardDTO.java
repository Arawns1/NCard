package br.com.itneki.nekicard.card.dto;

import br.com.itneki.nekicard.card.domain.CardType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveCardDTO {
    @Schema(example = "A6:EF:95:F7",
            requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "O campo (nfcId) não pode ser nulo ou vazio")
    @Pattern(regexp = "^[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}$",
             message = "Insira um NFC ID válido")
    private String nfcId;
    @Schema(example = "EX.: BLUE, BLACK, DARK_BLUE",
            requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "O campo (type) não pode ser nulo ou vazio")
    private String type;
}
