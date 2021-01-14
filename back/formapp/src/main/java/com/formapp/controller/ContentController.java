package com.formapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.formapp.mapper.ContentMapper;
import com.formapp.model.ReplyInfo;

@RestController
@RequestMapping("/contents")
public class ContentController {
	
	@Autowired
	ContentMapper contentMapper;
	
	@PostMapping("/{contentIdx}")
	public void contentReply(@PathVariable int contentIdx, @RequestBody ReplyInfo replyInfo) {		
		if(replyInfo.objReply == 0) { //subj
			contentMapper.replySubj(replyInfo);
		}
		else { //obj
			contentMapper.replyObj(replyInfo);
		}
	}

}
