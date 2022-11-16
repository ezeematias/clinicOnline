import { Component, OnInit } from '@angular/core';
import { Turns } from 'src/app/entities/turns';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turns-list-all',
  templateUrl: './turns-list-all.component.html',
  styleUrls: ['./turns-list-all.component.scss']
})
export class TurnsListAllComponent implements OnInit {
  userLogged = this.authService.getCurrentUser();
  turns: Turns[] = [];
  currentRate = 6;
  textFill: string = '';

  constructor(private userService: UsersService, private authService: AuthService, private modal: ModalService) { }

  ngOnInit(): void {
    this.userLogged.then(() => {
      this.userService.getTurnsAll().subscribe(turn => {
        this.turns = turn;
      })
    });
  }

  onClickCanel(tuns: Turns) {
    this.modal.modalCancelConfirm().then((result) => {
      if (result.isConfirmed) {
        this.modal.modalInputTextCancel().then(res => {
          this.userService.updateTurns(tuns, res, 'Cancelled');
          this.modal.modalSimple("Cancelado", "Se canceló el turno correctamente", "success");
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.modal.modalSimple("Cancelado", "El turno está a salvo", "error");
      }
    })
  }

  onClickRefused(tuns: Turns) {
    this.modal.modalCancelConfirmMsg("¿Desea rechazar el turno?", "Se rechazará el turno", 'question', "rechazarlo").then((result) => {
      if (result.isConfirmed) {
        this.modal.modalInputTextCancel().then(res => {
          this.userService.updateTurns(tuns, res, 'Refused');
          this.modal.modalSimple("Rechazado", "Se rechazó el turno correctamente", "success");
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.modal.modalSimple("Cancelado", "El turno está a salvo", "error");
      }
    })
  }

}
