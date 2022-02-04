import { Component, OnInit } from "@angular/core";
import { Endpoint } from "src/app/shared/API/Endpoint.model";
import { DataserviceService } from "src/app/shared/dataservice/dataservice.service";
import { ChartDB } from "../../../fack-db/chart-data";
import { ApexChartService } from "../../../theme/shared/components/chart/apex-chart/apex-chart.service";

@Component({
  selector: "app-dash-analytics",
  templateUrl: "./dash-analytics.component.html",
  styleUrls: ["./dash-analytics.component.scss"],
})
export class DashAnalyticsComponent implements OnInit {
  public chartDB: any;
  public dailyVisitorStatus: string;
  public dailyVisitorAxis: any;
  public deviceProgressBar: any;

  constructor(
    public apexEvent: ApexChartService,
    private datascv: DataserviceService
  ) {
    this.chartDB = ChartDB;
    this.dailyVisitorStatus = "1y";

    this.deviceProgressBar = [
      {
        type: "success",
        value: 66,
      },
      {
        type: "primary",
        value: 26,
      },
      {
        type: "danger",
        value: 8,
      },
    ];
  }

  analytics: {
    userscnt: number;
    rests: number;
    menusnos: number;
    SingleSources: number;
    inggroup: number;
    manufacting: number;
  } = {
    userscnt: null,
    rests: null,
    menusnos: null,
    SingleSources: null,
    inggroup: null,
    manufacting: null,
  };

  ngOnInit() {
    this.datascv.get(Endpoint.GetDashboardDetails).subscribe((res) => {
      this.analytics = [...res].pop();
      console.log(this.analytics);
    });
  }
}
