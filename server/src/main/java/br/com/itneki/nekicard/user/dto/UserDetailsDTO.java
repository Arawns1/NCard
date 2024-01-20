package br.com.itneki.nekicard.user.dto;

import br.com.itneki.nekicard.card.domain.Card;
import br.com.itneki.nekicard.socialmedia.domain.SocialMedia;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(value = JsonInclude.Include.NON_EMPTY)
public class UserDetailsDTO {
    private UUID id;
    private boolean status;
    private String name;
    private String email;
    private LocalDate birthdate;
    private String profilePhotoUrl;
    private String locality;
    private String description;
    private LocalDate workTime;
    private String workFunction;
    private String socialName;
    private String phone;
    private List<Card> cardList;
    private List<SocialMedia> socialMediaList;
}
