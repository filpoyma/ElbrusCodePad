<!-- Modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
    Launch demo modal
</button>
<a data-controls-modal="your_div_id" data-backdrop="static" data-keyboard="false" href="#"></a>
<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Enter your name to join</h5>
            </div>
            <div class="modal-body">
                <form method="POST" action="/signup">
                    <div class="form-group  mx-sm-3 mb-2">
                        <label for="invite-link" class="col-form-label"></label>
                        <div class="input-group">
                            <input type="text" class="form-control mb-2" placeholder="Your Name must be here"
                                id="invite-link">
                            <button type="button" class="btn btn-success mb-2" id="copy-to-clpb">GO!</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script defer type="text/javascript">
    $(window).on('load', function () {
        $('#exampleModalCenter').modal('show');       
    });
    $('#exampleModalCenter').on('hide.bs.modal', function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
});
    $('copy-to-clpb').on('click', function () {
        $('#exampleModalCenter').modal('show');
    });
</script>