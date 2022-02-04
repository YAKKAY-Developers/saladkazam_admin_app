import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Endpoint } from 'src/app/shared/API/Endpoint.model';
import { LoginRequest } from 'src/app/typings/bundles';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  feedback: {
    title: string;
    message: string;
  } = {
    title: '',
    message: '',
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  sendFeedback() {
    const title = this.feedback.title
      ? this.feedback.title.replace('/', ' ')
      : '';
    const message = this.feedback.message
      ? this.feedback.message.replace('/', ' ')
      : '';
    this.http
      .get(
        environment.server +
          Endpoint.FeedbackMail +
          '/' +
          title +
          '/' +
          message +
          '/' +
          LoginRequest.TeamHeadID
      )
      .subscribe(
        (res) => {
          if (res === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Feedback successfully send',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong, please try again later',
            });
          }
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong, please try again later',
          });
        }
      );
  }
}
