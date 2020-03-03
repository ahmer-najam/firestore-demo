import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";
import { Employee } from "src/app/shared/employee.model";

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
    if (form.value.id == null) {
      this.firesotre.collection("employee").add(form.value);
    } else {
      this.firesotre.doc("employee/" + form.value.id).update(form.value);
    }
    this.toastr.success("Process has been done..");
    this.restForm(form);
  }

  onEdit(item) {}
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
