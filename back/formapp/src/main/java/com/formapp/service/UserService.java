package com.formapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.formapp.mapper.UserMapper;
import com.formapp.vo.UserVO;

@Service
public class UserService {
	
	@Autowired
	UserMapper userMapper;
	
	public UserVO login(UserVO user) {
		UserVO matchUser = userMapper.login(user);
		if(matchUser == null) {
			return null;
		}
		else {
			return matchUser;
		}
	}
	
	public boolean signup(UserVO user) {
		if(userMapper.idCheck(user) != null)
			return false;
		else
			userMapper.signUp(user);
		return true;
	}
}
