export function Dialog(msg, callback) {
    let a = `  <!-- Modal -->
    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Message</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <p>${msg}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="(${callback})()">Save changes</button>
          </div>
        </div>
      </div>
    </div>`
    let diaglog = document.createElement();
    diaglog.innerHTML = a;
    return diaglog;
}
