package br.com.itneki.nekicard.user_photo.dto;

import br.com.itneki.nekicard.user_photo.domain.UserPhoto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserPhotoDTO {
    private UUID id;
    private String photo_URL;
}
