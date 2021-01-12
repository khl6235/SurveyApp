package com.formapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.formapp.mapper.FormMapper;
import com.formapp.vo.FormVO;

@RestController
@RequestMapping("/forms")
public class FormController {
	
	@Autowired
	FormMapper formMapper;
	
	@GetMapping
	public List<FormVO> formList(){
		System.out.println(formMapper.formList());
		System.out.println("설문 리스트 출력 성공");
		return formMapper.formList();
	}
	

}
