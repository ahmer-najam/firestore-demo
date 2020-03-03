import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  constructor(
    public service: EmployeeService,
    private firesotre: AngularFirestore,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.restForm();
  }

  onSubmit(form: NgForm) {
    this.firesotre.collection("employee").add(form.value);
    this.toastr.success("Process has been done..");
    this.restForm(form);
  }

  restForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      id: null,
      fullName: "",
      empCode: "",
      mobile: ""
    };
  }
}
