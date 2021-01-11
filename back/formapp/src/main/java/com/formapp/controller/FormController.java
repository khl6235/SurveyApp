package com.formapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.formapp.mapper.FormMapper;
import com.formapp.vo.ContentVO;
import com.formapp.vo.EntryVO;
import com.formapp.vo.FormVO;
import com.formapp.vo.ObjResultVO;
import com.formapp.vo.SubjResultVO;

@RestController
@RequestMapping("/forms")
public class FormController {
	
	public class ResultForm{
		public FormVO formInfo;
		public List<ContentInfo> contentInfo;
	}
	
	public class ContentInfo{
		public ContentVO contentDetail;
		public List<EntryVO> entryDetail;
		public List<ObjResultVO> objResultDetail;
		public List<SubjResultVO> subjResultDetail;
	}
	
	@Autowired
	FormMapper formMapper;
	
	@GetMapping
	public List<FormVO> formList(){
		System.out.println("=== 설문 목록 ===");
		return formMapper.formList();
	}
	
	@GetMapping("/{formIdx}")
	public ResultForm formDetail(@PathVariable int formIdx) {
		ResultForm resultForm = new ResultForm();
		
		//formInfo
		resultForm.formInfo = formMapper.formDetail(formIdx);
		System.out.println(resultForm.formInfo);
		
		//contentInfo
		List<ContentVO> contentList = formMapper.contentList(formIdx);
		List<ContentInfo> contentInfoList = new ArrayList<>();
		for(int con = 0; con < contentList.size(); con++) {
			ContentInfo contentInfo = new ContentInfo();
			
			//contentDetail
			contentInfo.contentDetail = contentList.get(con);
			
			int contentIdx = contentList.get(con).getContentIdx();
			
			//entryDetail
			List<EntryVO> entryDetail = formMapper.objEntryList(contentIdx);
			if(entryDetail.size() != 0) { //obj
				contentInfo.entryDetail = entryDetail;
				contentInfo.objResultDetail = formMapper.objResult(contentIdx);
				contentInfo.subjResultDetail = null;
			}
			else { //subj
				contentInfo.entryDetail = null;
				contentInfo.objResultDetail = null;
				contentInfo.subjResultDetail = formMapper.subjResult(contentIdx);
			}
			contentInfoList.add(contentInfo);
		}
		resultForm.contentInfo = contentInfoList;
		
		return resultForm;
	}


}

