package com.project.crud.services;

import java.util.List;
import java.util.Optional;

import com.project.crud.handlers.exception.NotFoundException;
import com.project.crud.models.Group;
import com.project.crud.repositories.GroupRepository;
import com.querydsl.core.types.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    public Page<Group> findByPage(Predicate predicate, Pageable pageable) {
        return groupRepository.findAll(predicate, pageable);
    }

    public List<Group> findAll() {
        return groupRepository.findAllByDeletedFalse();
    }

    public Group findById(String id) throws Exception {
        Optional<Group> group = groupRepository.findByIdAndDeletedFalse(id);
        if (group.isPresent()) {
            return group.get();
        }
        throw new NotFoundException();
    }

    public Group save(Group branch) {
        return groupRepository.save(branch);
    }

    public Group update(Group group) throws Exception {
        Group groupDB = findById(group.getId());
        groupDB.setName(group.getName());
        groupDB.setNickname(group.getNickname());
        groupDB.setDescription(group.getDescription());
        return groupRepository.save(groupDB);
    }

    public void delete(String id) throws Exception {
        Group group = findById(id);
        group.setDeleted(true);
        groupRepository.save(group);
    }
}