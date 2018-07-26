import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import * as XLSX from 'ts-xlsx';
//import { json2csv } from 'json-2-csv-ts';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';





@IonicPage()

@Component({
  selector: 'page-xlsx',
  templateUrl: 'xlsx.html',
})
@Injectable()
export class XlsxPage {
  sheetNames: string[] = []
  sheets: any;
  data: any;
  export: any;
  saveAs: any;
  extension: any;
  isSuccess: any;
  imgshow: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
  ) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad XlsxPage');

  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);

    let fileTypes = ['jpg', 'jpeg', 'png'];
    this.extension = target.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
      this.isSuccess = fileTypes.indexOf(this.extension) > -1;
    console.log(this.isSuccess);

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.IWorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.IWorkSheet = wb.Sheets[wsname];
      // console.log(ws);
      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data); //มีหัว collum
      this.export = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //ไม่มีหัว collum
    };
    reader.readAsBinaryString(target.files[0]);
    //reader.readAsArrayBuffer(target.files[0]);
  }
  exportxls() {
    new Angular2Csv(this.data, 'My Report');
  }

}
