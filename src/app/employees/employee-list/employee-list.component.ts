import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { Employee } from "src/app/shared/employee.model";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];
  constructor(
    public service: EmployeeService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.service.getEmployees().subscribe(arrayList => {
      this.employeeList = arrayList.map(item => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as Employee)
        } as Employee;
      });
    });
  }

  onEdit(item) {
    this.service.formData.id = item.id;
    this.service.formData.empCode = item.empCode;
    this.service.formData.fullName = item.fullName;
    this.service.formData.mobile = item.mobile;
  }

  onDelete(id) {
    this.firestore.doc("employee/" + id).delete();
  }
}
