import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
 
@Injectable()
export class UploadFileService {
  constructor(private http: Http) { }
 
  uploadfile(infos, file) {
 
    const bucket = new S3(
      {
        accessKeyId: 'AKIAIQFAQDYE7U3SXY4Q',
        secretAccessKey: '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',
        region: 'ap-northeast-2'
      }
    );
 
    const params = {
      Bucket: 'orderplatform-assets',
      Key: infos['path'] + '/' + infos['filename'],
      Body: file
    };
 
    //bucket.
    var result;
    var that = this;
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
 
      console.log('Successfully uploaded file.', data);
      that.http.post('https://bpxmjwpjgj.execute-api.ap-northeast-2.amazonaws.com/prod/put-custommaterial', infos)
          .subscribe(
            response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      return true;
    });
  }
}