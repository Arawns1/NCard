package br.com.itneki.nekicard.user.dto;

import br.com.itneki.nekicard.socialmedia.dto.SaveSocialMediaDTO;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.PastOrPresent;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

public record UpdateUserDTO(@Schema(example = "Petrópolis, RJ",
                            requiredMode = Schema.RequiredMode.NOT_REQUIRED)
                            String locality,
                            @Schema(example = "Desenvolvedor Júnior em constante aprendizado",
                                    requiredMode = Schema.RequiredMode.NOT_REQUIRED)
                            String description,
                            @PastOrPresent(message = "O campo (tempo de Neki) não pode estar no futuro")
                            @Schema(example = "2000-01-01",
                                    requiredMode = Schema.RequiredMode.NOT_REQUIRED)
                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                            LocalDate worktime,
                            @Schema(example = "Desenvolvedor júnior",
                                    requiredMode = Schema.RequiredMode.NOT_REQUIRED)
                            String workFunction,
                            @Schema(example = "Gabriel Santos",
                                    requiredMode = Schema.RequiredMode.NOT_REQUIRED)
                            String socialName,
                            @Schema(example = "+55 (99) 99999999",
                                    requiredMode = Schema.RequiredMode.NOT_REQUIRED)
                            String phone,

                            @Schema(type = "array", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
                            List<SaveSocialMediaDTO> mediaSocialList

) {
}
