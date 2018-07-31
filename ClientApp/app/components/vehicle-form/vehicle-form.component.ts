import { VehicleService } from "./../../services/vehicle.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"]
})
export class VehicleFormComponent implements OnInit {
  makes: any[] = [];
  models: any[] = [];
  features: any[] = [];
  vehicle: any = {
    features: [],
    contact: {}
  };

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService
      .getMakes()
      .subscribe((makes: any) => (this.makes = makes));

    this.vehicleService
      .getFeature()
      .subscribe((features: any) => (this.features = features));
  }

  onMakeChange(): void {
    if (this.vehicle.makeId) {
      this.vehicleService
        .getModelByMakeId(this.vehicle.makeId)
        .subscribe((models: any) => (this.models = models));
    }
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId: number, $event: any): void {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      let index: number = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit(): any {
    this.vehicleService
      .create(this.vehicle)
      .subscribe((x: any) => console.log(x));
  }
}
