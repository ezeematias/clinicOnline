import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Summary } from 'src/app/entities/summary';
import { Turns } from 'src/app/entities/turns';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { SummaryComponent } from '../summary/summary.component';

@Component({
  selector: 'app-turns-list-assigned',
  templateUrl: './turns-list-assigned.component.html',
  styleUrls: ['./turns-list-assigned.component.scss']
})
export class TurnsListAssignedComponent implements OnInit {

  userLogged = this.authService.getCurrentUser();
  turns: Turns[] = [];
  currentRate = 6;
  textFill: string = '';
  turnSelected!: Turns;

  abrirModal: boolean = false;
  abrirModala() {
    this.abrirModal = true;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  constructor(private userService: UsersService, private authService: AuthService, private modal: ModalService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userLogged.then((res) => {
      this.userService.getTurnId(res?.uid!, "specialistUid").subscribe(turn => {
        this.turns = turn;
      })
    });
  }

  onClickAccepted(tuns: Turns) {
    this.modal.modalCancelConfirmMsg("¿Desea aceptar el turno?", "Se aceptará el turno", 'info', "aceptarlo").then((result) => {
      if (result.isConfirmed) {
        this.userService.updateTurns(tuns, '', 'Accepted');
        this.modal.modalSimple("Aceptado", "Se aceptó el turno correctamente", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.modal.modalSimple("Cancelado", "El turno no se modificó", "error");
      }
    })
  }
  onClickCanel(tuns: Turns) {
    this.modal.modalCancelConfirmMsg("¿Desea cancelar el turno?", "Se cancelará el turno", 'question', "cancelarlo").then((result) => {
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

  onClickFinally(tuns: Turns, content: any) {
    this.modal.modalCancelConfirmMsg("¿Desea finalizar el turno?", "Se cerrará el turno", 'info', "finalizarlo").then((result) => {
      if (result.isConfirmed) {
        //this.userService.updateTurnsFinnally(tuns, 'Finalized');
        this.turnSelected = tuns;
        this.modalService.open(content);
        //this.modal.modalSimple("Finalizado", "Se finalizó el turno correctamente", "success");        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.modal.modalSimple("Cancelado", "El turno queda pendiente de terminar", "error");
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

  onClickShowPoll(tuns: Turns) {
    this.modal.modalMessageOk(tuns.poll ?? 'Sin datos', 'info');
  }

  onClickPoll(tuns: Turns) {
    this.modal.modalInputText("Encuesta", "Ingrese su comentario", "encuenta").then(res => {
      this.userService.updateTurnsPoll(tuns, res);
      this.modal.modalSimple("Guardado", "Se guardó correctamente su encuesta", "success");
    })
  }

  onClickShowReview(tuns: Turns) {
    this.modal.modalMessageOk(tuns.review ?? 'Sin datos', 'info');
  }

  onClickReview(tuns: Turns) {
    this.modal.modalInputText("Reseña", "Ingrese su comentario", "reseña").then(res => {
      this.userService.updateTurnsReview(tuns, res);
      this.modal.modalSimple("Guardado", "Se guardó correctamente su reseña", "success");
    })
  }

  info() {
  }

}
