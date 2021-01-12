import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

class ContentComponent extends Component{

    constructor(props){
        super(props);

        this.state={
            results: []
        }
    }

    componentDidMount(){
        this.loadContent();
    }

    loadContent = () => {
        if(this.props.contentInfo.subjResultDetail == null){
            this.objResult(this.props.contentInfo.entryDetail, this.props.contentInfo.objResultDetail);
        }
        else{
            this.subjResult(this.props.contentInfo.subjResultDetail);
        }
    }

    objResult = (entry, result) => {
        let resultDetail = [];
        entry.forEach(ent =>{
            resultDetail.push({'result': ent.entry, 'cnt': 0, 'entryIdx': ent.entryIdx});
        });

        result.some(res =>{
            let entryIdx = res.entryIdx;
            entry.forEach(ent =>{
                let entryIdx2 = ent.entryIdx;
                if(entryIdx2 == entryIdx){
                    let targetIdx = resultDetail.findIndex((result) => result.entryIdx == entryIdx);
                    resultDetail.splice(targetIdx, 1, {'result': ent.entry, 'cnt': resultDetail[targetIdx].cnt+1, 'entryIdx': entryIdx});
                }
            });
        });

        this.setState({
            results: resultDetail
        });
    }

    subjResult = (result) => {
        let resultDetail = [];
        result.forEach(res =>{
            if(res.answer != null)
                resultDetail.push({'result': res.answer});            
        });
        this.setState({
            results: resultDetail
        });
    }

    render(){
        return(
            <div style={contentStyle}>
                <Typography style={{fontWeight:600}} variant="h6">{this.props.contentInfo.contentDetail.question}</Typography>
                <Typography style={{marginTop: "7px", marginBottom: "15px"}} variant="body2">{this.props.contentInfo.contentDetail.description}</Typography>
                <Table>
                    <TableBody>
                        {this.state.results.map(res=>
                            <TableRow key={res.result}>
                                <TableCell component="th" scope="res" width="550px">{res.result}</TableCell>
                                <TableCell style={{color: "#3f51b5"}} align="center">{res.cnt}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            </div>
        )
    }
}

const contentStyle={
    margin:"40px 0"
}

export default ContentComponent;