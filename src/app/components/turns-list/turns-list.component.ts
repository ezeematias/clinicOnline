import { Component, OnInit } from '@angular/core';
import { Turns } from 'src/app/entities/turns';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turns-list',
  templateUrl: './turns-list.component.html',
  styleUrls: ['./turns-list.component.scss']
})
export class TurnsListComponent implements OnInit {

  userLogged = this.authService.getCurrentUser();
  turns: Turns[] = [];
  currentRate = 6;
  textFill: string = '';

  constructor(private userService: UsersService, private authService: AuthService, private modal: ModalService) { }

  ngOnInit(): void {
    this.userLogged.then((res) => {
      this.userService.getTurnId(res?.uid!, "patientUid").subscribe(turn => {
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
