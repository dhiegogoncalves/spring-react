package com.project.crud.services;

import java.util.List;
import java.util.Optional;

import com.project.crud.handlers.exception.NotFoundException;
import com.project.crud.models.Department;
import com.project.crud.repositories.DepartmentRepository;
import com.querydsl.core.types.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public Page<Department> findByPage(Predicate predicate, Pageable pageable) {
        return departmentRepository.findAll(predicate, pageable);
    }

    public List<Department> findAll() {
        return departmentRepository.findAllByDeletedFalse();
    }

    public Department findById(String id) throws Exception {
        Optional<Department> department = departmentRepository.findByIdAndDeletedFalse(id);
        if (department.isPresent()) {
            return department.get();
        }
        throw new NotFoundException();
    }

    public Department save(Department branch) {
        return departmentRepository.save(branch);
    }

    public Department update(Department department) throws Exception {
        Department departmentDB = findById(department.getId());
        departmentDB.setName(department.getName());
        departmentDB.setNickname(department.getNickname());
        departmentDB.setDescription(department.getDescription());
        return departmentRepository.save(departmentDB);
    }

    public void delete(String id) throws Exception {
        Department department = findById(id);
        department.setDeleted(true);
        departmentRepository.save(department);
    }
}