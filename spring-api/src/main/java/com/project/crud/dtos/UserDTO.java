package com.project.crud.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("users")
@TypeAlias("users")
@JsonIgnoreProperties(value = { "target" })
public class UserDTO {

    @Id
    private String id;

    private String name;

    public UserDTO(String id) {
        this.id = id;
    }
}