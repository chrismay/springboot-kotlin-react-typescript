package demoapp.gallery

import demoapp.NotFoundException
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table
import javax.transaction.Transactional

data class ImageView(val id: Long, val description: String, val createdDate: LocalDateTime)
data class CreateImage(val description: String)
data class UpdateImage(val description: String)

@RestController
@Transactional
class ImageApiController(val repo: ImageRepository) {

    @PostMapping("api/image/")
    fun createImage(@RequestBody creation: CreateImage): ImageView = repo.save(ImageEntity.fromDto(creation)).toView()

    @GetMapping("api/image/{id}")
    fun getImage(@PathVariable("id") id: Long): ImageView {
        return repo.findOne(id)?.toView() ?: throw NotFoundException();
    }

    @PutMapping("api/image/{id}")
    fun updateImage(@PathVariable("id") id: Long, @RequestBody update: UpdateImage):ImageView {
        val currentImage = repo.findOne(id)
        return if (currentImage != null) repo.save(ImageEntity.fromDto(update, currentImage)).toView()
        else throw NotFoundException();
    }

}

@Entity
@Table(name = "images")
data class ImageEntity(
        @Id @GeneratedValue val id: Long? = null,
        var description: String? = null,
        var createdDate: LocalDateTime? = null
) {

    fun toView(): ImageView = ImageView(
            id = this.id!!,
            description = this.description!!,
            createdDate = this.createdDate!!)

    companion object {
        fun fromDto(dto: CreateImage) = ImageEntity(
                description = dto.description,
                createdDate = LocalDateTime.now()
        )

        fun fromDto(dto: UpdateImage, current: ImageEntity) = ImageEntity(
                id = current.id!!,
                createdDate = current.createdDate!!,
                description = dto.description
        )
    }
}

@Transactional(Transactional.TxType.MANDATORY)
interface ImageRepository : JpaRepository<ImageEntity, Long>

