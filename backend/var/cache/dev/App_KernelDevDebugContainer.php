<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerPIL96m0\App_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerPIL96m0/App_KernelDevDebugContainer.php') {
    touch(__DIR__.'/ContainerPIL96m0.legacy');

    return;
}

if (!\class_exists(App_KernelDevDebugContainer::class, false)) {
    \class_alias(\ContainerPIL96m0\App_KernelDevDebugContainer::class, App_KernelDevDebugContainer::class, false);
}

return new \ContainerPIL96m0\App_KernelDevDebugContainer([
    'container.build_hash' => 'PIL96m0',
    'container.build_id' => '2e410e3b',
    'container.build_time' => 1691156767,
], __DIR__.\DIRECTORY_SEPARATOR.'ContainerPIL96m0');
