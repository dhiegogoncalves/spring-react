package com.project.crud.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.crud.dtos.UserDTO;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(value = { "target" })
public abstract class Base {

    @Id
    protected String id;

    protected Boolean deleted = false;

    @DBRef(lazy = true)
    @CreatedBy
    protected UserDTO createdBy;

    @DBRef(lazy = true)
    @LastModifiedBy
    protected UserDTO modifiedBy;

    @CreatedDate
    protected LocalDateTime dateCreated;

    @LastModifiedDate
    protected LocalDateTime dateModified;
}