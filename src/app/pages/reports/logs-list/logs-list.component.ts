import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss']
})
export class LogsListComponent implements OnInit {

  constructor(private userService: UsersService) { }
  logs: any;

  ngOnInit(): void {
    this.userService.getLogsAll().subscribe(sus => {
      this.logs = sus;
    })
  }

  downloadUsers() {
    var table_elt = document.getElementById("users-table");
    var workbook = XLSX.utils.table_to_book(table_elt);
    var ws = workbook.Sheets["Sheet1"];
    XLSX.writeFile(workbook, "plantilla-usuarios.xlsx");
  }

}
