package com.formapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.formapp.model.CreateForm;
import com.formapp.model.ReplyInfo;
import com.formapp.model.ResultForm;
import com.formapp.service.FormService;
import com.formapp.vo.FormVO;

@RestController
@RequestMapping("/forms")
public class FormController {
	@Autowired
	FormService formService;
	
	@GetMapping
	public List<FormVO> formList(){
		return formService.formList();
	}
	
	@GetMapping("/{formIdx}")
	public ResultForm formDetail(@PathVariable int formIdx) {
		return formService.formDetail(formIdx);
	}
	
	@PostMapping("/{formIdx}")
	public void formReply(@PathVariable int formIdx, @RequestBody List<ReplyInfo> replyInfo) {
		formService.formReply(formIdx, replyInfo);
	}
	
	@PostMapping
	public void formCreate(@RequestBody CreateForm createForm) {
		formService.formCreate(createForm);
	}
	
	@DeleteMapping("/{formIdx}")
	public void deleteForm(@PathVariable int formIdx) {
		formService.deleteForm(formIdx);
	}
}

