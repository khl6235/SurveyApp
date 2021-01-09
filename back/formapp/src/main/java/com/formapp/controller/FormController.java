package com.formapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.formapp.mapper.FormMapper;
import com.formapp.vo.FormVO;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/forms")
public class FormController {
	
	@Autowired
	FormMapper formMapper;
	
	@GetMapping
	public List<FormVO> formList(){
		System.out.println("=== 설문 목록 ===");
		return formMapper.formList();
	}
	

}
