<?php

namespace App\Controller;

use App\Entity\Enum\RoleEnum;
use App\Handler\UserHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class UserController extends BaseController
{
    private UserHandler $handler;

    function __construct(UserHandler $handler, JWTEncoderInterface $JWTEncoder)
    {
        $this->handler = $handler;
        $this->JWTEncoder = $JWTEncoder;
    }

    #[Route('/api/user', methods: ['POST'])]
    public function create(Request $request)
    {
        return $this->handler->create($request);
    }

    #[Route('/api/user/{id}', methods: ['PUT'])]
    public function update(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->update($request, $id, $user);
    }

    #[Route('/api/user/{id}', methods: ['DELETE'])]
    public function delete(Request $request, int $id)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user) || ($user->getId() !== $id && $user->getRole() !== RoleEnum::ROLE_ADMIN)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->delete($id);
    }

    #[Route('/api/users', methods: ['GET'])]
    public function getAll(Request $request)
    {
        return $this->handler->getAll($request);
    }

    #[Route('/api/user/me', methods: ['GET'])]
    public function getMe(Request $request)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->get($request, $user->getId());
    }

    #[Route('/api/user/{id}', methods: ['GET'])]
    public function get(Request $request, int $id)
    {
        return $this->handler->get($request, $id);
    }
}
