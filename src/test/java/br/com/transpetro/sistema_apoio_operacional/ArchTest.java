package br.com.transpetro.sistema_apoio_operacional;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("br.com.transpetro.sistema_apoio_operacional");

        noClasses()
            .that()
            .resideInAnyPackage("br.com.transpetro.sistema_apoio_operacional.service..")
            .or()
            .resideInAnyPackage("br.com.transpetro.sistema_apoio_operacional.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..br.com.transpetro.sistema_apoio_operacional.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
