package demoapp.gallery

import demoapp.NotFoundException
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.time.LocalDateTime
import javax.persistence.*
import javax.transaction.Transactional

data class ImageView(val id: Long, val description: String, val owner:String, val data:String, val createdDate: LocalDateTime)
data class CreateImage(val description: String, val owner:String, val data:String)
data class UpdateImage(val description: String, val data:String)

@RestController
@Transactional
class ImageApiController(val repo: ImageRepository) {

    @GetMapping("api/image")
    fun getAll() = repo.findAll().map { it.toView() }

    @PostMapping("api/image")
    fun createImage(@RequestBody creation: CreateImage): ResponseEntity<ImageView> {
        val iv = repo.save(ImageEntity.from(creation)).toView()
        val location = ServletUriComponentsBuilder.fromCurrentRequest().path(
                "/{id}").buildAndExpand(iv.id).toUri()
        return ResponseEntity.created(location).body(iv)
    }

    @GetMapping("api/image/{id}")
    fun getImage(@PathVariable("id") id: Long): ImageView {
        return repo.findOne(id)?.toView() ?: throw NotFoundException()
    }

    @PutMapping("api/image/{id}")
    fun updateImage(@PathVariable("id") id: Long, @RequestBody update: UpdateImage):ImageView {
        val currentImage = repo.findOne(id)
        return if (currentImage != null) repo.save(ImageEntity.from(update, currentImage)).toView()
        else throw NotFoundException()
    }
}

@Entity
@Table(name = "images")
data class ImageEntity(
        @Id @GeneratedValue val id: Long? = null,
        var description: String,
        var owner: String,
        var createdDate: LocalDateTime,
        @Lob var data:String
) {

    fun toView(): ImageView = ImageView(
            id = this.id!!,
            description = this.description,
            createdDate = this.createdDate,
            data = this.data,
            owner = this.owner

    )

    companion object {
        fun from(dto: CreateImage) = ImageEntity(
                description = dto.description,
                createdDate = LocalDateTime.now(),
                data = dto.data,
                owner = dto.owner
        )

        fun from(dto: UpdateImage, current: ImageEntity) = ImageEntity(
                id = current.id,
                owner = current.owner,
                createdDate = current.createdDate,
                description = dto.description,
                data = dto.data
        )
    }
}

@Transactional(Transactional.TxType.MANDATORY)
interface ImageRepository : JpaRepository<ImageEntity, Long>

