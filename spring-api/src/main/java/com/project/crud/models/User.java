package com.project.crud.models;

import java.util.List;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Document("users")
@TypeAlias("users")
@JsonIgnoreProperties(value = { "password" }, allowSetters = true)
public class User extends Base {

    @NotBlank
    private String name;

    @NotBlank
    private String email;

    @NotBlank
    private String username;

    private String password;

    @NotBlank
    private String language;

    @DBRef(lazy = true)
    private Department department;

    @DBRef(lazy = true)
    private List<Group> groups;

    private Boolean administrator = false;
}