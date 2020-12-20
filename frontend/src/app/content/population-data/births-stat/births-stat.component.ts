import { UtilityService } from './../../../utility.service';
import { BirthStatService } from './birth-stat.service';
import { LocationService } from './../../../location.service';
import { Component, OnInit } from '@angular/core';
import { groupBy, where } from '../../../helpers';

@Component({
  selector: 'app-births-stat',
  templateUrl: './births-stat.component.html',
  styleUrls: ['./births-stat.component.scss'],
})
export class BirthsStatComponent implements OnInit {
  constructor(
    private LocationService: LocationService,
    private BirthStatService: BirthStatService,
    private UtilityService: UtilityService
  ) {}

  municipalities: any = [];
  barangays: any = [];
  hasData = true;

  data = {
    municipality: 'Select Municipality',
    barangay: '',
    year: '',
    gender: '',
    total_live_births: '',
    crude_birth_rate: '',
    general_fertility_rate: '',
    months: {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    },
    type: 'Birth',
  };

  MONTHbarChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  MONTHbarChartLabels = [];
  MONTHbarChartType = 'bar';
  MONTHbarChartLegend = true;
  MONTHbarChartData = [{ data: [], label: 'Births By Months' }];

  // -------------

  TEENAGEBIRTHRATEbarChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  TEENAGEBIRTHRATEbarChartLabels = [];
  TEENAGEBIRTHRATEbarChartType = 'line';
  TEENAGEBIRTHRATEbarChartLegend = true;
  TEENAGEBIRTHRATEbarChartData = [
    { data: [], label: 'INCIDENCE OF TEENAGE BIRTHS' },
  ];

  // -------------

  ILLEGITIMATEBIRTHbarChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  ILLEGITIMATEBIRTHbarChartLabels = [];
  ILLEGITIMATEBIRTHbarChartType = 'line';
  ILLEGITIMATEBIRTHbarChartLegend = true;
  ILLEGITIMATEBIRTHbarChartData = [
    { data: [], label: 'INCIDENCE OF ILLEGITIMATE BIRTHS' },
  ];

  years = [];

  getDataParams = {
    barangay: '',
    municipality: '',
    year: '',
    gender: '',
  };

  checked = {
    male: false,
    female: false,
    all: true,
  };

  ngOnInit(): void {
    for (let i = 2020; i <= 2050; i++) {
      this.years.push(i);
    }
    this.getMuncipalities();
  }

  getMuncipalities() {
    this.LocationService.getMunicipalities().subscribe((data) => {
      this.municipalities = data;
    });
  }

  getBarangays(event) {
    this.data.municipality =
      event.target.options[event.target.options.selectedIndex].text;
    this.LocationService.getBarangays(event.target.value).subscribe((data) => {
      this.barangays = data;
    });
  }

  save() {
    this.BirthStatService.postToMOnthController(this.data).subscribe((data) => {
      this.BirthStatService.create(this.data).subscribe((data) => {
        this.UtilityService.setAlert(
          'New Death Statistics Data has been added',
          'success'
        );
      });
    });
  }

  editChartData = false;
  updateChart() {
    this.data['barangay'] = this.getDataParams.barangay;
    this.data['municipality'] = this.getDataParams.municipality;
    this.data['year'] = this.getDataParams.year;
    this.data['gender'] = this.getDataParams.gender;
    this.BirthStatService.postToMOnthController(this.data).subscribe((data) => {
      this.editChartData = false;
      this.MONTHbarChartLabels = [];
      this.MONTHbarChartData[0].data = [];
      this.fetchData();
      this.UtilityService.setAlert('Chart has been updated', 'success');
    });
  }

  getBarangaysandGet(event) {
    this.getDataParams.municipality =
      event.target.options[event.target.options.selectedIndex].text;
    this.LocationService.getBarangays(event.target.value).subscribe((data) => {
      this.barangays = data;
    });
  }

  check(item) {
    for (let checkbox in this.checked) {
      this.checked[checkbox] = false;
    }
    this.checked[item] = true;
    this.getDataParams.gender = item;
    this.fetchData();
  }

  birthSatistics = {};
  hasSelectedData = false;
  teenageBirth = [];
  legitimateBirth = [];
  fetchData() {
    this.BirthStatService.showData(
      this.getDataParams.municipality,
      this.getDataParams.barangay,
      this.getDataParams.year,
      this.getDataParams.gender
    ).subscribe(
      (data) => {
        this.hasSelectedData = true;
        this.birthSatistics = data.data;
        const incidences = groupBy(data.incidence, 'title');
        console.log(incidences);
        this.teenageBirth = [];
        this.legitimateBirth = [];
        console.log('this.legitimateBirth', this.legitimateBirth);
        // data.incidence.forEach(element => {
        // 	if(!this.TEENAGEBIRTHRATEbarChartLabels.includes(element.year)){
        // 		this.TEENAGEBIRTHRATEbarChartLabels.push(element.year)
        // 	}
        // 	this.TEENAGEBIRTHRATEbarChartData[0].data.push(element.value)
        // })
        data.month.forEach((element) => {
          if (!this.MONTHbarChartLabels.includes(element.month)) {
            this.MONTHbarChartLabels.push(element.month);
          }
          if (this.checked.male) {
            this.MONTHbarChartData[0].data.push(element.males);
            this.data.months[element.month] = element.males;
          }
          if (this.checked.female) {
            this.MONTHbarChartData[0].data.push(element.females);
            this.data.months[element.month] = element.females;
          }
          if (this.checked.all) {
            this.MONTHbarChartData[0].data.push(element.total);
            this.data.months[element.month] = element.total;
          }
        });
      },
      (error) => {
        this.hasSelectedData = false;
        this.UtilityService.setAlert(
          'No data on this particular filter yet',
          'info'
        );
      }
    );
  }

  bottomChartData = {
    title: '',
    type: 'Birth',
    value: 0,
    years: [],
  };
  DeathRateData = false;
  saveBottomCharts(title) {
    // INCIDENCE OF TEENAGE BIRTHS
    // INCIDENCE OF ILLEGITIMATE BIRTHS
    this.bottomChartData.title = title;
    this.bottomChartData['barangay'] = this.getDataParams.barangay;
    this.bottomChartData['municipality'] = this.getDataParams.municipality;
    this.bottomChartData['gender'] = this.getDataParams.gender;
    this.BirthStatService.postToinsidence(this.bottomChartData).subscribe(
      (data) => {
        this.DeathRateData = true;
        this.UtilityService.setAlert(title + ' has been Updated', 'success');
        this.TEENAGEBIRTHRATEbarChartLabels = [];
        this.TEENAGEBIRTHRATEbarChartData[0].data = [];
        this.ILLEGITIMATEBIRTHbarChartLabels = [];
        this.ILLEGITIMATEBIRTHbarChartData[0].data = [];
        this.fetchData();
      }
    );
  }
}
