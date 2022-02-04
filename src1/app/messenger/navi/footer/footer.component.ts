import { Component, OnInit } from '@angular/core';
import { LoginRequest } from 'src/app/typings/bundles';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  accessType = LoginRequest.AccessType;

  ngOnInit(): void {}
}
