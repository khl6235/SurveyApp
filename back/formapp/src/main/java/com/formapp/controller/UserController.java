package com.formapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.formapp.mapper.UserMapper;
import com.formapp.vo.UserVO;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserMapper userMapper;
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public UserVO login(@RequestBody UserVO user) {
		System.out.println("=== 로그인 ===");
		
		UserVO matchUser = userMapper.login(user);
		
		if(matchUser == null) {
			System.out.println("존재하지 않는 사용자입니다.");
			return null;
		}
		else {
			System.out.println(matchUser);
			return matchUser;
		}
	}
}
