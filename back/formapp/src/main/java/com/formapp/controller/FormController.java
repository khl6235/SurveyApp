package com.formapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.formapp.mapper.ContentMapper;
import com.formapp.mapper.FormMapper;
import com.formapp.model.ContentCreateInfo;
import com.formapp.model.ContentInfo;
import com.formapp.model.CreateForm;
import com.formapp.model.ObjEntry;
import com.formapp.model.ResultForm;
import com.formapp.vo.ContentVO;
import com.formapp.vo.EntryVO;
import com.formapp.vo.FormVO;

@RestController
@RequestMapping("/forms")
public class FormController {
	
	@Autowired
	FormMapper formMapper;
	
	@Autowired
	ContentMapper contentMapper;
	
	@GetMapping
	public List<FormVO> formList(){
		return formMapper.formList();
	}
	
	@GetMapping("/{formIdx}")
	public ResultForm formDetail(@PathVariable int formIdx) {
		ResultForm resultForm = new ResultForm();
		
		//formInfo
		resultForm.formInfo = formMapper.formDetail(formIdx);
		
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
	
	@PostMapping
	public void formCreate(@RequestBody CreateForm createForm) {
		FormVO formVO = new FormVO();
		formVO.setUserId(createForm.userId);
		formVO.setTitle(createForm.title);
		
		//insert form table & find formIdx
		formMapper.formCreate(formVO);
		int formIdx = formVO.getFormIdx();
		
		//find userIdx
		int userIdx = formMapper.findUser(createForm.userId);
		
		//insert user_form table
		formMapper.formUserCreate(userIdx, formIdx);
		
		for(int cont = 0; cont < createForm.contents.size(); cont++) {
			String contentType = createForm.contents.get(cont).contentType;
			if(contentType.equals("obj") || contentType.equals("subj")) {
				ContentCreateInfo contentInfo = createForm.contents.get(cont).contentInfo;
				ContentVO contentVO = new ContentVO();
				contentVO.setFormIdx(formIdx);
				contentVO.setQuestion(contentInfo.question);
				contentVO.setDescription(contentInfo.description);
				
				//insert content table & find contentIdx
				formMapper.contentCreate(contentVO);
				int contentIdx = contentVO.getContentIdx();
				
				//if obj, iteration
				if(contentType.equals("obj") && contentInfo.objEntry != null) {
					 ObjEntry objEntry = contentInfo.objEntry;
					 for(int ent = 0; ent < objEntry.entries.size(); ent++) {
						 EntryVO entryVO = new EntryVO();
						 entryVO.setContentIdx(contentIdx);
						 entryVO.setEntry(objEntry.entries.get(ent).entry);
						 
						 //insert obj_entry table
						 formMapper.entryCreate(entryVO);
					 }
				}
			}
			
		}
	}
}

