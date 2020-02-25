package com.project.crud.repositories;

import java.util.List;
import java.util.Optional;

import com.project.crud.models.QUser;
import com.project.crud.models.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.StringPath;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository
        extends MongoRepository<User, String>, QuerydslPredicateExecutor<User>, QuerydslBinderCustomizer<QUser> {

    @Query(fields = "{'id': 1, 'name': 1}")
    List<User> findAllByDeletedFalse();

    Boolean existsByUsernameAndDeletedFalse(String username);

    Optional<User> findByUsernameAndDeletedFalse(String username);

    Optional<User> findByIdAndDeletedFalse(String id);

    @Override
    default void customize(QuerydslBindings bindings, QUser root) {

        bindings.bind(root.name).first((StringPath path, String value) -> path.containsIgnoreCase(value));
        bindings.bind(root.email).first((StringPath path, String value) -> path.containsIgnoreCase(value));
        bindings.bind(root.username).first((StringPath path, String value) -> path.containsIgnoreCase(value));
        bindings.bind(root.department.id).first((StringPath path, String value) -> path.eq(value));

        bindings.bind(root.groups.any().id).first((path, value) -> {
            BooleanBuilder builder = new BooleanBuilder();
            builder.and(path.eq(value));
            return builder;
        });
        bindings.excluding(root.id);
    }
}