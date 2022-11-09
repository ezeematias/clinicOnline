import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.scss']
})
export class SpecialistListComponent implements OnInit {

  public specialists: any = [];

  constructor(private userService: UsersService, private modal: ModalService) { }

  ngOnInit(): void {
    this.userService.getUserAllSpecialist().subscribe((users) => {
      this.specialists = users;
    })
  }

  onClickupdate(user: User, status: boolean) {
    this.userService.updateUser(user, status);
    this.modal.modalMessage(status ? 'Habilitado' : 'Suspendido', status ? 'success' : 'error');
  }

  onClickDeleted(user: User) {
    this.modal.modalCancelConfirm().then((result) => {
      if (result.isConfirmed) {
        this.modal.modalSimple("Eliminado", "Se eliminó correctamente", "success");
        this.userService.deleteUser(user);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.modal.modalSimple("Cancelado", "El documento está a salvo", "error");
      }
    })
  }
}
